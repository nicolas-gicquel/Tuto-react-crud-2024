import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../components/Menu";
import axios from "axios";
import { Link } from 'react-router-dom';
const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    // displayClubs();
    fetchUser()
  }, []); // Sans les crochets ça tourne en boucle
  const displayClubs = async () => {
    await axios.get("http://127.0.0.1:8000/api/clubs", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    },).then((res) => {
      setClubs(res.data);
    });
  };
  const deleteClub = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/clubs/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }).then(displayClubs);
  };

  const fetchUser = async () => {
    if (!token) {
      console.error("Token non disponible");
      return;
    }
  
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/currentuser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      console.log("Réponse de l'API:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      if (error.response) {
        console.error("Détails de la réponse d'erreur:", error.response);
      }
    }

  }
  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom du club</th>
              <th>Logo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club.id}>
                <td>{club.nameClub}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/uploads/${club.logoClub}`}
                    width="75px"
                  />
                </td>
                <td>
                  <Link
                    to={`/clubs/edit/${club.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteClub(club.id);
                    }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Clubs;
