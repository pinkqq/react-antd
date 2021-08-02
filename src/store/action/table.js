import axios from 'axios';

// Action creator
export const fetchList =
  (page = 1, pageSize = 3, keyword = '') =>
  (dispatch) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: 'FETCH_LIST_BEGIN',
    });
    return new Promise((resolve, reject) => {
      const doRequest = axios.get(
        `https://reqres.in/api/users?page=${page}&per_page=${pageSize}&q=${keyword}`,
      );
      doRequest.then(
        (res) => {
          dispatch({
            type: 'FETCH_LIST_SUCCESS',
            data: {
              items: res.data.data,
              page,
              pageSize,
              total: res.data.total,
            },
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: 'FETCH_LIST_ERROR',
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };

export const fetchUser = (id) => (dispatch) => {
  // optionally you can have getState as the second argument
  dispatch({
    type: 'FETCH_USER_BEGIN',
  });

  return new Promise((resolve, reject) => {
    const doRequest = axios.get(`https://reqres.in/api/users/${id}`);
    doRequest.then(
      (res) => {
        dispatch({
          type: 'FETCH_USER_SUCCESS',
          data: res.data.data,
        });
        resolve(res);
      },
      (err) => {
        dispatch({
          type: 'FETCH_USER_ERROR',
          data: { error: err },
        });
        reject(err);
      },
    );
  });
};
