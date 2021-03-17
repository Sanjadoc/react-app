import React, { useCallback } from 'react';
import { createArticle, getOneArticle, updateArticle } from '../hooks/apiArticles';
import { useMutation, useQuery } from 'react-query';

import { AccessArticles } from '../../../components/content/articles/constants/AccessArticles';
import CreateArticle from '../../../components/content/articles/createArticle/CreateArticle';
import PropTypes from 'prop-types';

function CreateArticleContainer({ articleId, isOpen, handleClose }) {
    const { data: res, isFetching } = useQuery(["posts", articleId], () => getOneArticle({ articleId }),{ enabled: !!articleId });
    const articleData = res?.data || { title: "", text: "", access: AccessArticles.ALL, userId: 45 };

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