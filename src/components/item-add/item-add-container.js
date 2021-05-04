import React from "react";
import {compose} from "redux";

import {withStoreService} from "../hoc";
import ItemAdd from "./item-add";
import {withRouter} from "react-router-dom";
import ErrorIndicator from "../spinner/error-indicator";
import Spinner from "../spinner";

class ItemAddContainer extends React.Component {
    state = {
        item: {
            name: '',
            cost: '',
            img: '',
            description: '',
        },
        isLoading: false,
        error: null,
        file: null,
        fileURL: null,
    }

    setValueForItemInState(item) {
        this.setState({
            ...this.state,
            item: item,
            isLoading: false,
            error: null,
            fileURL: item.img,
        })
    }

    componentDidMount() {
        const {id, storeService: {getItem}} = this.props;

        if (!id) return;

        this.setState({isLoading: true});

        //fetchItem(id);
        getItem(id)
            .then(resolve => this.setValueForItemInState(resolve)
            )
    }

    onFileChange = async (e) => {
        const {name} = e.target;
        const file = e.target.files[0];

        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [name]: file?.name
            },
            file: file,
        })
    }

    onChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [name]: value
            }
        })
    }

    uploadImg = (event) => {
        //const file = event.target.files[0];
        const file = 'file';
        let formData = new FormData();
        formData.append('image', file);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {item, file, fileURL} = this.state;

        const {id, storeService: {putItem, postItem}} = this.props;

        this.setState({isLoading: true});

        id
            ? putItem(item, id, file, fileURL)
                .then(resolve => {
                    this.setValueForItemInState(resolve);
                    alert('Обновлено')
                })
            : postItem(item, file)
                .then(resolve => {
                    this.setValueForItemInState(resolve);
                    alert('Созданно')
                });

    };

    render() {
        const {isLoading, error, item: {name, cost, img, description}} = this.state;

        if (error) return <ErrorIndicator/>

        if (isLoading) return <Spinner/>

        const {onChange, onFileChange, onSubmit, uploadImg} = this;
        const {goBack} = this.props.history;
        return (<ItemAdd
                name={name}
                cost={cost}
                img={img}
                description={description}
                onChange={onChange}
                onFileChange={onFileChange}
                onSubmit={onSubmit}
                goBack={goBack}
                uploadImg={uploadImg}/>
        )
    }
}

export default compose(
    withStoreService(),
    withRouter,
)(ItemAddContainer);
