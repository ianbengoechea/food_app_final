// export const fetchAllNoticias = callback => {
//   return dispatch => {
//     NoticiaService.fetchAllNotcias()
//       .then(response => {
//
//         const listaCategoria = [];
//         response.forEach(element => {
//           listaCategoria.push(element.categoria)
//         })
//         listaCategoria.unshift(_TODOS)
//         response.category = listaCategoria;
//
//         dispatch({
//           type: NOTICIA_FETCH_ALL,
//           payload: response.reverse(),
//         });
//
//         if (callback) callback(response);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
// };
