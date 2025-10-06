import React, { useEffect, useState } from "react";
import Header from "../components/header/index";
import Content from "../components/contentarea/index";
import { getSketches, postSketches, deleteSketchById, updateSketchById } from "../services/sketches.api";
import Snackbar from '@mui/material/Snackbar';
import { Theme, CardData } from "../types/notes";

const Home: React.FC = () => {
  const [sketches, setSketches] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (message: string) => {
    setToastMsg(message);
    setToastOpen(true);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getSketches();
        setSketches(data);
      } catch (e) {
        console.error(e);
        setError("Erro ao carregar.");
        showToast("Erro ao carregar.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreate = async (payload: { text: string; theme: Theme }) => {
    try {
      const created = await postSketches(payload);
      setSketches((prev) => [...prev, created]);
      showToast("Criado com sucesso!");
    } catch {
      showToast("Erro ao criar.");
    }
  };

  const handleUpdate = async (id: string, payload: { text: string; theme: Theme }) => {
    try {
      const updated = await updateSketchById(id, payload);
      setSketches((prev) =>
        prev.map((card) => (card.id === updated.id ? updated : card))
      );
      showToast("Atualizado com sucesso!");
    } catch {
      showToast("Erro ao atualizar.");
    }
  };


  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSketchById(id);
      if (res.success) {
        setSketches((prev) => prev.filter((card) => card.id !== id));
        showToast("Apagado com sucesso!");
      }
    } catch {
      showToast("Erro ao apagar.");
    }
  };

  return (
    <>
      <Header onCreate={handleCreate} />
      <Content
        sketches={sketches}
        loading={loading}
        error={error}
        onUpdated={handleUpdate}
        onDeleted={handleDelete}
      />
      <Snackbar
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message={toastMsg}
      />
    </>
  );

};

export default Home;