/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useMessage from './useMessege';
import { recipeEditURL } from '../urls/index';

const useRecipeEdit = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const recipeEdit = useCallback((data, loginUserId, image) => {
    setLoading(true);
    axios
      .patch(
        recipeEditURL(data.id),
        {
          recipe: {
            user_id: loginUserId,
            title: data.title,
            time_required: data.time_required,
            food: data.food,
            process: data.process,
            image: {
              data: image.data,
              name: image.name,
            },
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === 'updated') {
          showMessage({ title: '編集しました', status: 'success' });
          setLoading(false);
          history.push('/index');
        } else if (response.data.status === 422) {
          showMessage({ title: `${response.data.errors}`, status: 'error' });
          setLoading(false);
        } else if (response.data.status === 500) {
          showMessage({ title: `${response.data.errors}`, status: 'error' });
        }
      })
      .catch(() => {
        showMessage({ title: '編集できませんでした', status: 'error' });
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const recipeEditNoImage = useCallback((data, loginUserId) => {
    setLoading(true);
    axios
      .patch(
        recipeEditURL(data.id),
        {
          recipe: {
            user_id: loginUserId,
            title: data.title,
            time_required: data.time_required,
            food: data.food,
            process: data.process,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === 'updated') {
          showMessage({ title: '編集しました', status: 'success' });
          setLoading(false);
          history.push('/index');
        } else if (response.data.status === 422) {
          showMessage({ title: `${response.data.errors}`, status: 'error' });
          setLoading(false);
        } else if (response.data.status === 500) {
          showMessage({ title: `${response.data.errors}`, status: 'error' });
        }
      })
      .catch(() => {
        showMessage({ title: '編集できませんでした', status: 'error' });
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { recipeEdit, recipeEditNoImage, loading };
};

export default useRecipeEdit;
