import React, { useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';

import { AccessArticles } from '../../../components/content/articles/constants/AccessArticles';
import ApiArticles from '../api/apiArticles';
import CreateArticle from '../../../components/content/articles/createArticle/CreateArticle';
import PropTypes from 'prop-types';
import useApi from '../../../hooks/useApi';
import useAuth from '../../../hooks/useAuth';

function CreateArticleContainer({ articleId, isOpen, handleClose }) {
    
    const { callApi } = useApi();
    const {updateArticle, createArticle} = ApiArticles();
    const { user } = useAuth();
    
    const { data: res, isFetching } = useQuery(["posts", articleId], () => callApi(`/posts/${articleId}`),{ enabled: !!articleId });
    const articleData = res || { title: "", text: "", access: AccessArticles.ALL, userId: user.id };

    const { mutate: updatePost } = useMutation(updateArticle);
    const { mutate: createPost } = useMutation(createArticle);

    const onSubmitCreate = useCallback(async sendData => {
        try {
           await createPost({ sendData });
        } catch (err) {
            console.log(err);
        }
    }, [createPost]);

    const onSubmitUpdate = useCallback(async sendData => {
        try {
            await updatePost({ articleId, sendData });
        } catch (err) {
            console.log(err);
        }
    }, 
    // eslint-disable-next-line
    [updatePost]);

    return (
        <>
            { !isFetching && 
                <CreateArticle
                    articleData={articleData}
                    onSubmit={!!articleId ? onSubmitUpdate : onSubmitCreate}
                    edit={!!articleId}
                    isOpen={isOpen}
                    handleClose={handleClose}
                />
            }
        </>
    );
}

CreateArticleContainer.propTypes = {
    articleId: PropTypes.number,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func
}

export default CreateArticleContainer;