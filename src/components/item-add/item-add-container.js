import React from "react";
import {compose} from "redux";

import {withStoreService} from "../hoc";
import ItemAdd from "./item-add";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import {clearMessage, fetchProps, setDisappearingMessage, setMessage} from "../../actions";
import {connect} from "react-redux";

class ItemAddContainer extends React.Component {
    state = {
        item: {
            name: '',
            cost: '',
            img: '',
            description: '',
            properties: {
                /*                id: {
                                    nameProperty: '',
                                    valueProperty: '',
                                    valueDropDownProperty: {},
                                    typeProperty: '',
                                }*/
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

    componentWillUnmount() {
        const {clearMessage} = this.props;
        clearMessage();
    }

    findNotUseProperty = () => {
        // находит первое не используемое свойство

        const {props: propertiesList = []} = this.props;

        if (!('properties' in this.state.item)) {
            return propertiesList[0];
        }

        const existsPropertyArr = Object.keys(this.state.item.properties).map(key => this.state.item.properties[key].nameProperty);

        for (let i = 0; i <= propertiesList.length - 1; i++) {
            const nameProperty = propertiesList[i];

            if (!existsPropertyArr.includes(nameProperty.propName)) {
                return nameProperty;
            }

        }
        return null;
    }

    findPropertyByName = (nameProperty) => {
        const {props: propertiesList = []} = this.props;
        return propertiesList.find(prop => prop.propName === nameProperty)
    }

    addProperty = (notUsedProperty) => {

        this.setState({
            ...this.state,
            itemDirty: {...this.state.itemDirty},
            item: {
                ...this.state.item,
                properties: {
                    ...this.state.item.properties,
                    [Date.now()]: {
                        nameProperty: notUsedProperty.propName,
                        typeProperty: notUsedProperty.propType,
                        valueProperty: notUsedProperty.propType !== 'Dropdown' ? '' : null,
                        valueDropDownProperty: notUsedProperty.propType === 'Dropdown' ? {[Date.now()]: ''} : null
                    }
                }
            },
        })

    }

    addPropertyDropdown = (id) => {
        this.setState(state => {
            return {
                ...state,
                itemDirty: {...this.state.itemDirty},
                item: {
                    ...state.item,
                    properties: {
                        ...state.item.properties,
                        [id]: {
                            ...state.item.properties[id],
                            valueDropDownProperty: {
                                ...state.item.properties[id].valueDropDownProperty,
                                [Date.now()]: ''
                            }

                            //valueDropDownProperty: notUsedProperty.propType === 'Dropdown' ? {[Date.now()]: ''} : null
                        }
                    }
                },
            }
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

        this.setState((state) => {
            let newValue = null;
            let newValueDropdown = null;
            if (name === 'nameProperty' || name === 'valueProperty') {
                newValue = {[name]: value};
                if (name === 'nameProperty') {
                    const typeProperty = this.findPropertyByName(value).propType
                    newValue.typeProperty = typeProperty;

                    if (typeProperty === 'Dropdown') {
                        delete state.item.properties[id].valueProperty
                        state.item.properties[id].valueDropDownProperty = {[Date.now()]: ''};

                    } else {
                        delete state.item.properties[id].valueDropDownProperty;
                        state.item.properties[id].valueProperty = '';
                    }

                }
                if (name === 'valueProperty') {
                    const typeProperty = state.item.properties[id]?.typeProperty;
                    switch (typeProperty) {
                        case 'Number': {
                            const regexp = /^[0-9]+$/;
                            if (!value.match(regexp) && value.length > 0) return;
                            break;
                        }
                    }
                }
            } else {
                newValueDropdown = {[name]: value};
            }

            return {
                ...state,
                itemDirty: {...state.itemDirty},
                item: {
                    ...state.item,
                    properties: {
                        ...state.item.properties,
                        [id]: {
                            ...state.item.properties[id],
                            ...newValue,
                            valueDropDownProperty: {...state.item.properties[id]?.valueDropDownProperty, ...newValueDropdown}
                            //[name]: value
                        }
                    }
                }
            }
        })
        //console.log(this.state)
    }

    onDeleteProperty = (id) => {
        //console.log(`must be deleted ${id}`);
        this.setState((state) => {
            delete state.item.properties[id];
            return state;
        })
    }

    deletePropertyDropdown = (idProperty, idPropertyDropdown) => {
        this.setState((state) => {
            delete state.item.properties[idProperty].valueDropDownProperty[idPropertyDropdown];
            return state;
        })

    }

    onSubmit = (e) => {
        e.preventDefault();
        const {item, file, fileURL} = this.state;

        const {id, storeService: {putItem, postItem}, setMessage, setDisappearingMessage} = this.props;

        this.setState({isLoading: true});

        if (id) {
            setMessage(`Обновление данных о товаре [${item.name}] ...`);
            putItem(item, id, file, fileURL)
                .then(resolve => {
                    this.setValueForItemInState(resolve);
                    //alert('Обновлено');
                    setMessage(`Данные о товаре [${item.name}] обновлены!`, 'success');
                    //setDisappearingMessage(`Данные о товаре [${item.name}] обновлены ...`);

                })
                .catch(error => {
                    setMessage(`Что-то пошло не так! Не обновились данные о товаре [${item.name}]!`, 'danger');
                    this.setState({error: error, isLoading: false})

                })
        } else {
            postItem(item, file)
                .then(resolve => {
                    this.setValueForItemInState(resolve);
                    //alert('Созданно');
                    setMessage(`Товар создан [${item.name}] ...`, 'success');
                })
                .catch(error => {
                    setMessage(`Что-то пошло не так! Товар [${item.name}] не был создан!`, 'danger');
                    this.setState({error: error, isLoading: false})

                });
        }

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
            findNotUseProperty,
            addPropertyDropdown,
            deletePropertyDropdown
        } = this;

        return (<ItemAdd
                item={item}
                itemDirty={itemDirty}
                onChange={onChange}
                onFileChange={onFileChange}
                onSubmit={onSubmit}
                blurHandler={blurHandler}
                addProperty={addProperty}
                propertiesList={propertiesList}
                isLoadingProperties={isLoadingProperties}
                onChangeProperty={onChangeProperty}
                onDeleteProperty={onDeleteProperty}
                notUsedProperty={findNotUseProperty()}
                addPropertyDropdown={addPropertyDropdown}
                deletePropertyDropdown={deletePropertyDropdown}
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
        //deleteProp: (id) => deleteProp(id)(storeService, dispatch),
        setMessage: (message, typeMessage) => dispatch(setMessage(message, typeMessage)),
        setDisappearingMessage: (message, typeMessage) => setDisappearingMessage(message, typeMessage)(dispatch),
        clearMessage: () => dispatch(clearMessage())
    }
}

export default compose(
    withStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ItemAddContainer);
