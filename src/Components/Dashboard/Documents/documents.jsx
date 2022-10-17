import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getEnveloppes, updateEnveloppe } from "../../../Redux/filesSlice";
import { useEffect, useState } from "react";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { deleteEnveloppe, deleteEnveloppes } from "../../../Redux/filesSlice";

//Function for format Date (padTo2Digits with formatDate)
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return (
    [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("/") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}
//***************************************************   Used Functions  ************************************************** */

/************************************************************** */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

//***********************************************************HEAD CELLS*************************************************//
const headCells = [
  {
    id: "enveloppe",
    numeric: false,
    disablePadding: true,
    label: "Nom de l'enveloppe",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "lastmodif",
    numeric: true,
    disablePadding: false,
    label: "Derniére modification",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];
//**************************************************** Enhanced Table Head *******************************************//
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all ",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              className="cells"
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, selected } = props;
  const dispatch = useDispatch();
  const removeEnveloppes = () => {
    const envIds = selected;
    dispatch(deleteEnveloppes(envIds))
      .unwrap()
      .then((ok) => {
        console.log(ok);
      })
      .catch((er) => console.log(er));
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tous
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={removeEnveloppes}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
/*******************************************  TABLE *****************************************/
export default function EnhancedTable(props) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const docs = props.docs;
  const setEnveloppe = props.setEnveloppe;
  const handleShow = props.handleShow;
  /****************************************** Documents **********************************************/

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = docs.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    console.log(selected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const statusclassname = (status) => {
    let classname = "warning";
    switch (status) {
      case "Terminé":
        classname = "success";
        break;
      case "Supprimé":
        classname = "danger";
        break;
      case "Brouillon":
        classname = "warning";
      case "En cours":
        classname = "warning";
        break;
      default:
        classname = "success";
    }
    return classname;
  };
  const actionDropdown = (status) => {
    let action = "Télécharger";
    switch (status) {
      case "Terminé":
        action = "Télécharger";
        break;
      case "Supprimé":
        action = "Récupérer";
        break;
      case "Brouillon":
        action = "Signer";
      case "En cours":
        action = "Signer";
        break;
      default:
        action = "Télécharger";
    }
    return action;
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - docs.length) : 0;

  /****************************************** SOME FUNCTIONS  ***********************************************/
  const DeleteEnveloppe = (idEnveloppe, statusEnveloppe, enveloppeName) => {
    if (statusEnveloppe === "Supprimé" || statusEnveloppe === "Brouillon") {
      dispatch(deleteEnveloppe(idEnveloppe))
        .unwrap()
        .then((ok) => {})
        .catch((e) => {});
    } else {
      const enveloppeStatus_ = "Supprimé";
      const favoris = false;
      const envId = idEnveloppe;
      dispatch(
        updateEnveloppe({
          envId,
          enveloppeName,
          enveloppeStatus_,
          favoris,
        })
      )
        .unwrap()
        .then((ok) => {})
        .catch((e) => {});
    }
  };
  const EnveloppeDetails = (enveloppe) => {
    setEnveloppe(enveloppe);
    handleShow(true);
  };
  const SignOrDownload = (envId, nom, status) => {
    const enveloppeStatus_ = "Terminé";
    const enveloppeName = nom;
    const favoris = false;
    if (status === "Brouillon") {
      navigate("/signature/" + envId + "/" + nom);
    } else if (status === "Supprimé") {
      console.log(envId);
      dispatch(
        updateEnveloppe({
          envId,
          enveloppeName,
          enveloppeStatus_,
          favoris,
        })
      )
        .unwrap()
        .then((ok) => {
          const data = console.log(ok);
        })
        .catch((e) => {});
    } else {
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={docs.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(docs, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const dateAjout = formatDate(new Date(row.dateAjout));
                  const dateDerniermodification = formatDate(
                    new Date(row.derniereModification)
                  );
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <span className="nom__field ">{row.nom}</span>
                        <br />
                        <i className="bi bi-calendar date__expiration__field"></i>{" "}
                        <span className="date__expiration__field">
                          {dateAjout.toString()}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          disabled
                          size="sm"
                          style={{ width: 90 }}
                          variant={statusclassname(row.status)}
                        >
                          {row.status}
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        {dateDerniermodification.toString()}
                      </TableCell>
                      <TableCell align="center">
                        <DropdownButton id="dropdownbtn" title="Actions">
                          <DropdownItem
                            onClick={() =>
                              SignOrDownload(row.id, row.nom, row.status)
                            }
                          >
                            {actionDropdown(row.status)}
                          </DropdownItem>
                          <DropdownItem>Partager</DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              DeleteEnveloppe(row.id, row.status, row.nom);
                            }}
                          >
                            Supprimer
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              EnveloppeDetails(row);
                            }}
                          >
                            Plus
                          </DropdownItem>
                        </DropdownButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={docs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
