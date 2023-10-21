import React, { useState, useEffect } from 'react';
import BlogCards from './BlogCards';
import Pagination from './Pagination'; 
import CategorySelection from './CategorySelection';
import SideBar from './SideBar';


const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12 // blogs per page
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);


    useEffect(() => {
        async function fetchBlogs() {
            let url = `http://localhost:5000/blogs?pages=${currentPage}&limit=${pageSize}`;

            // filter by category
            if(selectedCategory){
                url += `&category=${selectedCategory}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setBlogs(data);
        }

        fetchBlogs();
    }, [currentPage, pageSize, selectedCategory])

    // changing btn
    const handlePageChange = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }

    const handleCategoryChange = (category) =>{
        setSelectedCategory(category);
        setCurrentPage(1);
        setActiveCategory(category);
    }


  return (
    <div>
        {/* category section */}
        <div>
            <CategorySelection onSelectCategory={handleCategoryChange} activeCategory={activeCategory}/>
        </div>

        {/* blogcards section */}
        <div className='flex flex-col lg:flex-row gap-12'>
            <div className='lg:flex-1'>
            
            {/* blog cards components */}
            <BlogCards
              blogs={blogs}
              currentPage={currentPage}
              selectedCategory={selectedCategory}
              pageSize={pageSize}
              />
    
        {/* pagination section */}
            <Pagination
             onPageChange={handlePageChange}
             currentPage={currentPage}
             blogs={blogs}
             pageSize={pageSize}
             />
        </div>

        {/* sidebar container */}
        <div className='lg:w-1/4'>
            <SideBar/>
            </div>
        </div>
    </div>
  );
};

export default BlogPage
