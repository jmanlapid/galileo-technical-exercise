export default function getTasksByDoctorIdApi(provider) {
  const { doctor_id } = provider;
  const id = doctor_id.charAt(doctor_id.length - 1);
  return new Promise((resolve, reject) => {
    fetch(`https://testapi.io/api/akirayoglu/0/tasks/doctor${id}`)
      .then((response) => {
        resolve(response.json());
      });
  });
}

