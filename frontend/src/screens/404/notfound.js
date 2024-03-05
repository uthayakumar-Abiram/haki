

import {  
    Container
  } from "react-bootstrap";
import "./style.css"
const NotFound = () => {
    return (
      <section className="section1"> 
        <div className="main">
     <Container>
       
    <div className="space"/>
   <article>
     <div className="error">
      <div className="wrap">
        <div className="404">
          <pre>
            <code>
              <span className="green">&lt;!</span><span>DOCTYPE html</span><span className="green">&gt;</span>
              <span className="orange">&lt;html&gt;</span>
              <span className="orange">&lt;style&gt;</span>
              * {'{'}
              <span className="green">everything</span>:<span className="blue">awesome</span>;
              {'}'}
              <span className="orange">&lt;/style&gt;</span>
              <span className="orange">&lt;body&gt;</span>
              ERROR 404!
              FILE NOT FOUND!
              <span className="comment">&lt;!--The file you are looking for, 
                is not where you think it is.--&gt;
              </span>
              <span className="orange">&lt;/body&gt;</span>
              <span className="orange">&lt;/html&gt;</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
    </article>
      
          
      </Container>
      </div>
      </section>
    );
  };
  
  
  export default NotFound;