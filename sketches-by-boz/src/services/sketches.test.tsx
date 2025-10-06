import { getSketches, postSketches, updateSketchById, deleteSketchById, api} from "./sketches.api";

describe("Test apis functions", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should teste if getSketches, fetch data", async () => {
        const sketches = [{ id: "1", text: "a test note", theme: "verde" }];
        const response = { data: sketches };

        api.get = jest.fn().mockResolvedValue(response);

        const data = await getSketches();

        expect(api.get).toHaveBeenCalledWith("/sketches");
        expect(data).toEqual(sketches);
    });

    it("should teste if postSketch, create and return data", async() => {
        const payload = { text: "a test note", theme: "verde" };
        const newSketch = { id: "1", ...payload };

        api.post = jest.fn().mockResolvedValue({ data: newSketch });

        const data = await postSketches(payload);

        expect(api.post).toHaveBeenCalledWith("/sketches", payload);
        expect(data).toEqual(newSketch);  
    });

    it("should teste if updateSketchById, update and return data", async() => {
        const id = "1";
        const payload = { text: "an updated test note" };
        const updatedSketch = { id, text: "an updated test note", theme: "verde" };

        api.patch = jest.fn().mockResolvedValue({ data: updatedSketch });

        const data = await updateSketchById(id, payload);

        expect(api.patch).toHaveBeenCalledWith(`/sketches/${id}`, payload);
        expect(data).toEqual(updatedSketch);  
    });

    it("should teste if deleteSketchById, delete and return success", async() => {
        const id = "1";

        api.delete = jest.fn().mockResolvedValue({ status: 200 });

        const data = await deleteSketchById(id);

        expect(api.delete).toHaveBeenCalledWith(`/sketches/${id}`);
        expect(data).toEqual({ success: true, id });
    });
})