import { Api } from "./api";

export async function getCategoryOptions() {
  const categories = await Api.getAllCategories();
  return categories.map(c => ({ label: c.label, value: c.id }));
}

export async function getPatientOptions() {
  const patients = await Api.getAllPatients();
  return patients.map(p => ({
    label: `${p.firstname} ${p.lastname}`,
    value: p.id
  }));
}