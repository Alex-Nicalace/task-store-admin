import React from "react";
import {compose} from "redux";

import {withStoreService} from "../hoc";
import ItemAdd from "./item-add";
import {withRouter} from "react-router-dom";
import ErrorIndicator from "../spinner/error-indicator";
import Spinner from "../spinner";
import {deleteProp, fetchProps} from "../../actions";
import {connect} from "react-redux";

class ItemAddContainer extends React.Component {
    state = {
        item: {
            name: '',
            cost: '',
            img: '',
            description: '',
            properties: {
                // id:{
                //     nameProperty:'',
                //     valueProperty:'',
                // }
            }
        },
        itemDirty: {
            nameDirty: false,
            costDirty: false,
            imgDirty: false,
        },
        isLoading: false,
        error: null,
        file: null,
        fileURL: null,
    }

    setValueForItemInState(item) {
        this.setState({
            ...this.state,
            isLoading: false,
            error: null,
            fileURL: item.img,
            item: {...item, /*properties: item.properties*/},
            //item.properties: {...item.properties},
        })
    }

    componentDidMount() {
        const {id, storeService: {getItem}, fetchProps} = this.props;

        fetchProps();

        if (!id) return;

        this.setState({isLoading: true});

        //fetchItem(id);
        getItem(id)
            .then(resolve => this.setValueForItemInState(resolve)
            )
    }

    findNotUseProperty = () => {
        // находит первое не используемое свойство

        const {props: propertiesList = []} = this.props;

        if (!('properties' in this.state.item)) {
            return propertiesList[0].propName;
        }

        const existsPropertyArr = Object.keys(this.state.item.properties).map(key => this.state.item.properties[key].nameProperty);

        for (let i = 0; i <= propertiesList.length - 1; i++) {
            const nameProperty = propertiesList[i].propName;

            if (!existsPropertyArr.includes(nameProperty)) {
                return nameProperty;
            }

        }
        return null;
    }

    addProperty = (notUsedProperty) => {
        this.setState({
            ...this.state,
            itemDirty: {...this.state.itemDirty},
            item: {
                ...this.state.item,
                properties: {
                    ...this.state.item.properties,
                    [Date.now()]: {nameProperty: notUsedProperty, valueProperty: ''}
                }
            },
        })

    }

    blurHandler = (e) => {
        const {name} = e.target;
        this.setState({
            ...this.state,
            itemDirty: {
                ...this.state.itemDirty,
                [`${name}Dirty`]: true
            }
        })
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
        switch (name) {
            case 'cost': {
                const regexp = /^[0-9]+$/;
                if (!value.match(regexp) && value.length > 0) return;
                break;
            }
        }
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [name]: value
            }
        })
    }

    onChangeProperty = (e) => {
        const {name, value, id} = e.target;

        this.setState({
            ...this.state,
            itemDirty: {...this.state.itemDirty},
            item: {
                ...this.state.item,
                properties: {
                    ...this.state.item.properties,
                    [id]: {
                        ...this.state.item.properties[id],
                        [name]: value
                    }
                }
            }
        })
        console.log(this.state)
    }

    onDeleteProperty = (id) => {
        console.log(`must be deleted ${id}`);
        this.setState((state) => {
            delete state.item.properties[id];
            return state;
        })
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
        const {isLoading, error, item, itemDirty} = this.state;
        const {props: propertiesList, isLoading: isLoadingProperties} = this.props;

        if (error) return <ErrorIndicator/>

        if (isLoading) return <Spinner/>

        const {
            onChange,
            onFileChange,
            onSubmit,
            blurHandler,
            addProperty,
            onChangeProperty,
            onDeleteProperty,
            findNotUseProperty
        } = this;
        const {goBack} = this.props.history;
        return (<ItemAdd
                item={item}
                itemDirty={itemDirty}
                onChange={onChange}
                onFileChange={onFileChange}
                onSubmit={onSubmit}
                goBack={goBack}
                blurHandler={blurHandler}
                addProperty={addProperty}
                propertiesList={propertiesList}
                isLoadingProperties={isLoadingProperties}
                onChangeProperty={onChangeProperty}
                onDeleteProperty={onDeleteProperty}
                notUsedProperty={findNotUseProperty()}
            />
        )
    }
}

const mapStateToProps = ({propsList}) => {
    return {
        props: propsList.props,
        isLoading: propsList.isLoading,
        error: propsList.error,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {storeService} = ownProps;
    return {
        fetchProps: fetchProps(storeService, dispatch),
        deleteProp: (id) => deleteProp(id)(storeService, dispatch)
    }
}

export default compose(
    withStoreService(),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(ItemAddContainer);
