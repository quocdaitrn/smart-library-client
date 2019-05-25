import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index';

var SectionRepository = {};

SectionRepository.List = [
    {id:1,name:'Tâm lý'},
    {id:2,name:'Khoa học Kỹ thuật'},
    {id:3,name:'Tiểu thuyết'},
    {id:4,name:'Truyện ngắn'},
    {id:5,name:'Triết học'},
    {id:6,name:'Kinh tế'}
];

SectionRepository.getList = () => {
    return axios.get(`${ API_BASE_URL }/sections`);
};

SectionRepository.getPopularList= () => {
    return axios.get(`${ API_BASE_URL }/sections/popular`);
};

SectionRepository.get = (id) => {
    console.log(id)
    return axios.get(`${API_BASE_URL}/sections/${id}`);
}

SectionRepository.PopularLists = [
    {
        id:1,
        name:'Tâm lý',
        total:120,
        image:'images/find-place1.jpg'
    },
    {
        id:2,
        name:'Khoa học Kỹ thuật',
        total:62,
        image:'images/find-place2.jpg'
    },
    {
        id:3,
        name:'Tiểu thuyết',
        total:94,
        image:'images/find-place3.jpg'
    },
    {
        id:4,
        name:'Truyện ngắn',
        total:30,
        image:'images/find-place4.jpg'
    },
    {
        id:5,
        name:'Triết học',
        total:40,
        image:'images/find-place5.jpg'
    }
]

export default SectionRepository;