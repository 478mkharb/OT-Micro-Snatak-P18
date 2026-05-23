import React, { useState, useEffect } from 'react';
import { Grid, StatsCard, Card } from 'tabler-react';
import C3Chart from "react-c3js";

const fetchAll = () => fetch('/employee/search/all').then(r => {
    if (!r.ok) throw new Error("Network issue");
    return r.json();
});

export const ListAllEmployees = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetchAll().then(data => setCount(data ? data.length : 0)).catch(() => setCount(0));
    }, []);
    return (<Grid.Col sm={3}><StatsCard layout={1} movement={0} total={count} label="Total Employees" /></Grid.Col>);
};

export const ListEmployeeActiveEmployee = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetchAll().then(data => {
            setCount((data || []).filter(e => e.status === "Current Employee").length);
        }).catch(() => setCount(0));
    }, []);
    return (<Grid.Col sm={3}><StatsCard layout={1} movement={0} total={count} label="Active Employees" /></Grid.Col>);
};

export const ListEmployeeInActiveEmployee = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetchAll().then(data => {
            setCount((data || []).filter(e => e.status === "Ex-Employee").length);
        }).catch(() => setCount(0));
    }, []);
    return (<Grid.Col sm={3}><StatsCard layout={1} movement={0} total={count} label="Ex-Employees" /></Grid.Col>);
};

export const RoleDistribution = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchAll().then(res => {
            const devops = (res || []).filter(e => (e.designation || "").includes("DevOps")).length;
            const dev = (res || []).filter(e => (e.designation || "").includes("Developer")).length;
            if(devops > 0 || dev > 0) setData([["DevOps", devops], ["Developer", dev]]);
        }).catch(() => setData([]));
    }, []);

    return (
        <Grid.Col sm={4}><Card>
            <Card.Header><Card.Title>Job Role Distribution</Card.Title></Card.Header>
            <Card.Body>
                {data.length > 0 ? <C3Chart style={{ height: "12rem" }} data={{ columns: data, type: "donut" }} /> : "Loading charts..."}
            </Card.Body>
        </Card></Grid.Col>
    );
};

export const LocationDistribution = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchAll().then(res => {
            const noida = (res || []).filter(e => (e.office_location || "").includes("Noida")).length;
            const delhi = (res || []).filter(e => (e.office_location || "").includes("Delhi")).length;
            if(noida > 0 || delhi > 0) setData([["Noida", noida], ["Delhi", delhi]]);
        }).catch(() => setData([]));
    }, []);

    return (
        <Grid.Col sm={4}><Card>
            <Card.Header><Card.Title>Locations Distribution</Card.Title></Card.Header>
            <Card.Body>
                {data.length > 0 ? <C3Chart style={{ height: "12rem" }} data={{ columns: data, type: "donut" }} /> : "Loading charts..."}
            </Card.Body>
        </Card></Grid.Col>
    );
};

export const StatusDistribution = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchAll().then(res => {
            const current = (res || []).filter(e => e.status === "Current Employee").length;
            const ex = (res || []).filter(e => e.status === "Ex-Employee").length;
            if(current > 0 || ex > 0) setData([["Current", current], ["Ex", ex]]);
        }).catch(() => setData([]));
    }, []);

    return (
        <Grid.Col sm={4}><Card>
            <Card.Header><Card.Title>Employee Status Distribution</Card.Title></Card.Header>
            <Card.Body>
                {data.length > 0 ? <C3Chart style={{ height: "12rem" }} data={{ columns: data, type: "donut" }} /> : "Loading charts..."}
            </Card.Body>
        </Card></Grid.Col>
    );
};
