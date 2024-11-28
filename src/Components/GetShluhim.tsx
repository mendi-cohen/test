import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

    async function getShluhim() {
        try {
            const results = await Promise.all(
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
                     console.log(data);
                     return data;
                })
            );
            setData(results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        getShluhim();
    }, []);


    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Shaliach</TableCell>
                        <TableCell>Branch</TableCell>
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
        </>
    )
}