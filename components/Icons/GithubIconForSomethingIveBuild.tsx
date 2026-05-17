import React, { useState, useEffect } from 'react';

const GithubIcon = props => {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    if (!props.link || !props.link.includes("github.com/")) return;
    
    try {
      const url = new URL(props.link);
      const pathParts = url.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        const owner = pathParts[0];
        const repo = pathParts[1];
        
        fetch(`https://api.github.com/repos/${owner}/${repo}`)
          .then(res => {
            if (res.ok) return res.json();
            return null;
          })
          .then(data => {
            if (data && data.stargazers_count > 0) {
              setStars(data.stargazers_count);
            }
          })
          .catch(e => console.error(e));
      }
    } catch (e) {
      // ignore
    }
  }, [props.link]);

  return (
    <a href={props.link} target="_blank" rel="noreferrer" className="flex flex-row items-center space-x-2 group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 text-gray-300 group-hover:text-AAsecondary hover:cursor-pointer 
 transition ease-in-out delay-50 group-hover:-translate-y-1 
group-hover:scale-110 duration-200"
      >
        <title>GitHub</title>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
      {stars && (
        <span className="text-gray-400 group-hover:text-AAsecondary text-sm font-mono flex items-center transition-colors duration-200 group-hover:-translate-y-1 group-hover:scale-110">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          {stars}
        </span>
      )}
    </a>
  );
};
export default GithubIcon;