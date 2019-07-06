export default function getDoctorsApi() {
  return new Promise((resolve, reject) => {
    fetch('https://testapi.io/api/akirayoglu/0/reference/getDoctors')
      .then((response) => {
        resolve(response.json());
      });
  });
}

