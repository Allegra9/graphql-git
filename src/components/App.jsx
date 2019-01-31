import React, { Component } from "react";
import TopLanguages from "./TopLanguages";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import styled from "@emotion/styled";

const REPOSITORIES = gql`
  {
    viewer {
      repositories(last: 15, isFork: false) {
        nodes {
          name
          description
          url
          languages(first: 5) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
`;

export default class App extends Component {
  render() {
    return (
      <Container>
        <h2>Top Languages</h2>

        <Query query={REPOSITORIES} variables={{}}>
          {({ data, loading }) =>
            loading ? (
              <span>Loading...</span>
            ) : (
              <TopLanguages repositories={data.viewer.repositories} />
            )
          }
        </Query>
      </Container>
    );
  }
}

const Container = styled("div")`
  width: 100%;
  height: 75vh;
  max-height: 600px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;
