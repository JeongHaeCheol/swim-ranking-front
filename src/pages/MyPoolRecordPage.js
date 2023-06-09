import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';


// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// 테스트용 유저데이터를 갖고 있음
import USERLIST from '../_mock/user';
import { swimmingPool , getPercentileRank} from '../api/swimmingPool';


// ----------------------------------------------------------------------


const TABLE_HEAD2 = [
  { id: 'name', label: '이름', alignRight: false },
  { id: 'gender', label: '성별', alignRight: false },
  { id: 'birth', label: '생년월일', alignRight: false },
  { id: 'event', label: '종목', alignRight: false },
  { id: 'record', label: '기록', alignRight: false },
  { id: 'officialCheck', label: '공식기록여부', alignRight: false },
  { id: 'measuredDate', label: '측정날짜', alignRight: false },
  
  { id: '' },
];
// ----------------------------------------------------------------------

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

export default function MyPoolRecordPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);




  const [swimRecord, setSwimRecord] = useState({version: 0, result: null});
  const [pecentage, setPecentage] = useState(0);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = async(event) => {
    setPage(0);
    setFilterName(event.target.value);

    try{
      const pecentage = await getPercentileRank(1, event.target.value);
      const responseData = await swimmingPool(event.target.value);
      const nr = {
        version: swimRecord.version + 1,
        result: responseData
      }
      setSwimRecord(nr);
      setPecentage(pecentage);
      console.log(swimRecord);
      console.log(pecentage);
    } catch (error) {
      console.error(error);
    }
    
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - swimRecord.length) : 0;

  const isNotFound = !swimRecord.result && !!filterName;

  return (
    <>
      <Helmet>
        <title> 내수영장 기록 | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
            내 수영장 기록
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />


          <Typography variant="h7" gutterBottom>
            <div style={{padding: "20px"}}>
            내 기록은 상위 {pecentage} % 입니다.
            </div>
          </Typography>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD2}
                  rowCount={swimRecord.length}
                  numSelected={selected.length}
              
                />


                <TableBody>
                  {
                  swimRecord.result !== null && swimRecord.result !== "result : no data" && swimRecord.result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    console.log("### TEST");
                    console.log(row);
                    const { name, gender, stroke, distance, raceTime, raceRank, competitionName, competitionDate } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={row.name} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {row.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{row.gender}</TableCell>

                        <TableCell align="left">{row.birth}</TableCell>

                        <TableCell align="left">{row.event}</TableCell>

                        <TableCell align="left">{row.record}</TableCell>

                        <TableCell align="left">{row.officialCheck ? "공식" : "비공식"}</TableCell>

                        <TableCell align="left">{row.measuredDate}</TableCell>

                        {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell> */}

                        {/* <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={swimRecord.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      
    </>
  );
}
