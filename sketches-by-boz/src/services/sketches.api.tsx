import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000",
});

export type Sketch = {
  id?: string;
  text: string;
  theme: string
};

export const getSketches = async () => {
  try {
    const response = await api.get(`/sketches`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postSketches = async (body: {
  text: string, theme: string;
}) => {
  try {
    const response = await api.post("/sketches", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSketchById = async (
  id: string,
  body: Partial<Sketch>
) => {
  try {
    const response = await api.patch(`/sketches/${id}`, body);
    return response.data;
  } catch (error) {
    console.error("Erro no PATCH:", error);
    throw error;
  }
};

export const deleteSketchById = async (id: string) => {
  try {
    const response = await api.delete(`/sketches/${id}`);
    return { success: response.status >= 200 && response.status < 300, id };
  } catch (error) {
    throw error;
  }
};