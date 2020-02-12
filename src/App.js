import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [repoList, setRepoList] = useState([]);
  const [error, setError] = useState("");

  const getRepos = async () => {
    try {
      const res = await fetch(
        "https://api.github.com/search/repositories?q=stars:%3E25000+language:javascript&sort=stars&order=desc"
      );
      const repos = await res.json();
      //throw new Error('My Error')
      const list = repos.items.map(
        ({ full_name, stargazers_count, html_url, id }) => ({
          full_name,
          stargazers_count,
          html_url,
          id
        })
      );
      setRepoList(list);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  if (error !== "") {
    return <div>Error Occurred: {error}</div>;
  }
  return (
    <>
      {repoList && repoList.length === 0 ? (
        <div>Loading..</div>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Full Name</th>
              <th>Stars</th>
              <th>Links</th>
            </tr>
            {repoList.map(({ full_name, stargazers_count, html_url, id }) => (
              <tr key={id}>
                <td>{full_name}</td>
                <td>{stargazers_count}</td>
                <td>
                  <a href={html_url}>{html_url}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
