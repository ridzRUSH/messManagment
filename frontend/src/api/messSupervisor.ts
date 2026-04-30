import axiosInstance from "./axiosInstance";

// ===== Ration Item Management =====
export const addRationItem = (data: {
  name: string;
  unit: string;
  unit_cost: number;
  supplier_id: number;
  hostel_id: number;
}) => axiosInstance.post("/mess-supervisor/add-ration-item", data);

export const getRationItems = (hostel_id: number) =>
  axiosInstance.get("/mess-supervisor/get-ration-items", {
    params: { hostel_id }
  });

export const updateRationItem = (
  id: number,
  data: {
    name: string;
    unit: string;
    unit_cost: number;
    supplier_id: number;
    hostel_id: number;
  }
) => axiosInstance.post(`/mess-supervisor/update-ration-item/${id}`, data);

export const deleteRationItem = (id: number, hostel_id: number) =>
  axiosInstance.delete(`/mess-supervisor/delete-ration-item/${id}`, {
    data: { hostel_id }
  });

// ===== Consumption Tracking =====
export const getMonthlyConsumption = (hostel_id: number, year: number, month: number) => {
  return axiosInstance.get("/mess-supervisor/monthly-consumption", {
    params: { hostel_id, year, month }
  });
};
