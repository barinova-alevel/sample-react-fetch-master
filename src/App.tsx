import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

interface IListItemProps {
  title: string;
  description: string;
  count: number;
}

const ListItem = (props: IListItemProps) => (
  <ListGroup.Item as="li"
    className="d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">{props.title}</div>
      {props.description}
    </div>
    <Badge bg="primary" pill>
      {props.count}
    </Badge>
  </ListGroup.Item>
);

interface IListProps {
  children: React.ReactNode;
}

const List = (props: IListProps) => (
  <ListGroup as="ol" numbered>
    {props.children}
  </ListGroup>
)

function App() {
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState('');

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function longOperation(): Promise<string> {
    const text = "Custom list";
    await sleep(2000);
    return text;
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    async function init() {
      const result = await longOperation();
      setHeader(result);
      setLoading(false);
    }

    init();
  });

  return (
    <Container className="p-3">
      <Container className="pb-1 p-5 mb-4 bg-light rounded-3">
        {loading && <span>Loading...</span>
        }
        {loading
          ? <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          :
          <>
            <h1 className="header">{header}</h1>
             
            <List>
              <ListItem title="bla bla" description="moo noo loo" count={4} />
              <ListItem title="bla bla" description="moo noo loo" count={4} />
              <ListItem title="bla bla" description="moo noo loo" count={4} />
              <ListItem title="bla bla" description="moo noo loo" count={4} />
              <ListItem title="bla bla" description="moo noo loo" count={4} />
              <ListItem title="bla bla" description="moo noo loo" count={4} />
              <ListItem title="bla bla" description="moo noo loo" count={4} />
            </List>
          </>
        }

      </Container>
    </Container>
  );
}

interface IEmployee {
  name: string | undefined;
  job: string | undefined;
  id: number | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}
interface IUserData {
  data: IUser;
}
interface IUser {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  url_avatar: string;
}

interface IResource {
id: number | undefined;
name: string | undefined;
year: number | undefined;
color: string | undefined;
pantoneValue: string | undefined;
}

async function get(): Promise<IUserData> {
  const response = await fetch('https://reqres.in/api/users/1');
  return await response.json();
}

async function getUsers(): Promise<IUser[]> {
  const response = await fetch('https://reqres.in/api/users?page=2');
  return await response.json();
}

async function createEmployee(): Promise<IEmployee> {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'morpheus2', job: 'leader' })
  };
  const response = await fetch('https://reqres.in/api/users', requestOptions);
  return await response.json();
}

async function updateUser(): Promise<IEmployee> {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'morpheus', job: 'zion resident' })
  };
  const response = await fetch('https://reqres.in/api/users/2', requestOptions);
  return await response.json();
}

async function getResource(): Promise<IResource> {
  const response = await fetch('https://reqres.in/api/unknown/2');
  return await response.json();
}

async function getResources(): Promise<IResource[]> {
  const response = await fetch('https://reqres.in/api/unknown');
  return await response.json();
}

const UserCardComponent = (props: IUser) => {
  return <Card as="li" key={props?.id}>
    <Card.Body>
      <Card.Title>{props.id}</Card.Title>
      <Card.Text>{props.first_name} {props.last_name} {props.email}</Card.Text>
    </Card.Body>
  </Card>
}

const EmployeeCardComponent = (props: IEmployee) => {
  return <Card as="li" key={props?.id}>
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text>{props.id} {props.name} {props.job} {props.createdAt} {props.updatedAt}</Card.Text>
    </Card.Body>
  </Card>
}

const ResourceCardComponent = (props: IResource) => {
  return <Card as="li" key={props?.id}>
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text>{props.id} {props.name} {props.year} {props.color} {props.pantoneValue}</Card.Text>
    </Card.Body>
  </Card>
}

export function UserComponent() {

  const [user, setUser] = React.useState<IUser[]>([]);
  const [users, setUsers] = React.useState<IUser[]>();
  const [createdEmploee, setCreatedEmploee] = React.useState<IEmployee>();
  const [updatedUser, setUpdatedUser] = React.useState<IEmployee>();

  useEffect(() => {

    async function init() {
      const user = await get();
      setUser([user.data]);
      const createdEmploee = await createEmployee();
      setCreatedEmploee(createdEmploee);
      const resultGetUsers = await getUsers();
      setUsers(resultGetUsers);
      const updatedUser = await updateUser();
      setUpdatedUser(updatedUser);
    }

    init();
  }, []);

  return (<>
    {users?.map(item => (
      <UserCardComponent key={item.id} id={item.id} first_name={item.first_name} last_name={item.last_name} email={item.email} url_avatar={item.url_avatar} />
    ))}
    {user.map(item => (
      <UserCardComponent key={item.id} id={item.id} email={item.email} first_name={item.first_name} last_name={item.last_name} url_avatar={item.url_avatar} />
    ))}
    <EmployeeCardComponent id={createdEmploee?.id} name={createdEmploee?.name} job={createdEmploee?.job} createdAt={createdEmploee?.createdAt} updatedAt={createdEmploee?.updatedAt} />
    <EmployeeCardComponent id={updatedUser?.id} name={updatedUser?.name} job={updatedUser?.job} createdAt={updatedUser?.createdAt} updatedAt={updatedUser?.updatedAt} />

  </>);
}

export function ResourceComponent() {

  const [resource, setResource] = React.useState<IResource>();
  const [resources, setResources] = React.useState<IResource[]>([]);

  useEffect(() => {

    async function init() {
      const resource = await getResource();
      setResource(resource);
      const resources = await getResources();
      setResources(resources);
    }

    init();
  }, []);

  return (<>
    {resources?.map(item => (
      <ResourceCardComponent key={item.id} id={item.id} name={item.name} year={item.year} color={item.color} pantoneValue={item.pantoneValue} />
    ))}
    <ResourceCardComponent id={resource?.id} name={resource?.name} year={resource?.year} color={resource?.color} pantoneValue={resource?.pantoneValue}/>
  </>);
}


export default App;
