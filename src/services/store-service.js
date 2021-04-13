export default class StoreService {
    _items = [
        {
            id: 1,
            name: 'CASHES VALLEY LANE',
            cost: 500000,
            dateModify: '01.11.2018',
            img: 'https://static.mk.ru/upload/objects/articles/detailPicture/f0/ce/0b/a9/4904366_5421264.jpg',
            description: '1__Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto at error itaque\n' +
                'laudantium modi nihil obcaecati officia, quia repellat. Assumenda aut commodi eius\n' +
                'exercitationem laboriosam quod reiciendis sequi vel.',
            yearOfManufacture: 1983,
            color: 'красный',
            typeFuel: 'бензин',
        },
        {
            id: 2,
            name: 'DURUN DURUN HOUSE',
            cost: 1216000,
            dateModify: '01.11.2018',
            img: 'https://pic.auto.mail.ru/844147/',
            description: '2__Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto at error itaque\n' +
                'laudantium modi nihil obcaecati officia, quia repellat. Assumenda aut commodi eius\n' +
                'exercitationem laboriosam quod reiciendis sequi vel.',
            yearOfManufacture: 2000,
            color: 'синий',
            typeFuel: 'дизель',
        },
        {
            id: 3,
            name: 'Mercedes S550 4matic',
            cost: 118000,
            dateModify: '31.10.2018',
            img: 'https://avtonov.info/wp-content/uploads/2019/01/Lamborghini-Reventon.jpg',
            description: '3__Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto at error itaque\n' +
                'laudantium modi nihil obcaecati officia, quia repellat. Assumenda aut commodi eius\n' +
                'exercitationem laboriosam quod reiciendis sequi vel.',
            yearOfManufacture: 2020,
            color: 'белый',
            typeFuel: 'дизель',
        },
        {
            id: 4,
            name: 'Mercedes 600',
            cost: 11000,
            dateModify: '31.10.2011',
            img: 'https://tarantas.news/uploads/images/2019/10/10/ret_001.jpg',
            description: '4__Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto at error itaque\n' +
                'laudantium modi nihil obcaecati officia, quia repellat. Assumenda aut commodi eius\n' +
                'exercitationem laboriosam quod reiciendis sequi vel.',
            yearOfManufacture: 1961,
            color: 'желтый',
            typeFuel: 'бензин',
        },
    ]

    _props = [
        {
            id: 1,
            propName: 'Цвет авто',
            propType: 'Dropdown',
        },
        {
            id: 2,
            propName: 'Год выпуска',
            propType: 'Number',
        },
        {
            id: 3,
            propName: 'Тип топлива',
            propType: 'String',
        },
    ]

    getItems = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //reject (new Error('Some'))

                resolve(this._items)
            }, 700)
        })
    }

    getItem = (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //reject (new Error('Some'))

                resolve(this._items.find(item => item.id === id))
            }, 700)
        })
    }

    getProps = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //reject (new Error('Some'))

                resolve(this._props)
            }, 700)
        })
    }
}