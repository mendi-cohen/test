import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';



const idList: number[] = [
    424,
    425,
    426,
    427,
    428,
    429,
    430,
    431,
    432,
    433,
    434,
    435,
    436,
    437,
    438,
    439,
    440
]
interface ShaliachData {
    shaliach: string;
    branch: string;
    publicName: string;
}

export default function BasicTable() {
    const [data, setData] = useState<ShaliachData[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(false);  

    const currentTheme = createTheme({

        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: {
                 main: isDarkMode ? '#1976d2' : '#2196f3'
            },
            secondary: {
                main: isDarkMode ? '#dc004e' : '#f50057',
            },
        },

    });

    async function getShluhim() {
        try {
            const results = await Promise.allSettled(
                idList.map(async (id) => {
                    const response = await fetch(
                        `https://sm-dashboard-production.up.railway.app/api/pub/shluchim/${id}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    const data = await response.json();
                    return data;
                })
            );
            setData(results.map((result) => result.status === 'fulfilled' ? result.value : null));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        getShluhim();
    }, []);



    return (
        <ThemeProvider theme={currentTheme}>
            <div>
            <Button 
                    variant="contained" 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    sx={{ 
                        backgroundColor: isDarkMode ? 'yellow' : 'blue',
                        color: isDarkMode ? 'black' : 'white',
                        margin: '10px'
                    }}
                >
                    {isDarkMode ? 'מצב יום' : 'מצב לילה'}
                </Button>

                <TableContainer component={Paper} dir='rtl'>
                    <Table sx={{ minWidth: 650, backgroundColor: currentTheme.palette.secondary.main, fontFamily: currentTheme.typography.fontFamily }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: currentTheme.palette.primary.main }}>
                            <TableRow>
                                <TableCell>שם השליח</TableCell>
                                <TableCell>מקום השליחות</TableCell>
                                <TableCell>Public Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.shaliach}>
                                    <TableCell>{row.shaliach}</TableCell>
                                    <TableCell>{row.branch}</TableCell>
                                    <TableCell>{row.publicName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </ThemeProvider>
    )
}