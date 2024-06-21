import { useState, useEffect } from 'react';

function Instagram() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:9999/Instagram');
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, []);
    return (
        <div className='grid  grid-cols-2 gap-4 mt-8'>
            {data.map((ig, index) => {
                return (
                    <img
                        className='w-full'
                        key={index}
                        src={ig.image}
                        alt='IMG instagram'
                    />
                );
            })}
        </div>
    );
}

export default Instagram;
