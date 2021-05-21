import React, { useState, useEffect } from 'react';
import './stories.css';
import { Route, Link, useLocation, useParams, Switch } from 'react-router-dom';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export function Stories() {

    let { title } = useParams();
    let location = useLocation();

    let [ responded, setResponded ] = useState(true);
    let [response, setResponse] = useState('response');

    let [pageNum, setPageNum] = useState(1);
    let [numPages, setNumPages] = useState(0);
    let [skipTo, setSkipTo] = useState(1);

    let [error, setError] = useState('');

    function retrieve() {
        fetch('/api/stories/' + title)
            .then((res) => res.text())
            .then((res) => { setResponse(res); setResponded(true); })
            .catch((err) => {
                console.error('Error: ', err);
                setError(err);
            });
    }
    useEffect(() => {
        if (title === 'Index' || title === 'index') {
            setResponded(false);
            retrieve();
        } else {
            setResponded(true);
            setPageNum(1);
            setNumPages(0);
        }
    }, [location]);

    let basePath = location.pathname.slice(0, location.pathname.lastIndexOf('/'))

    function renderLink(fileName) {

        let storyName = fileName.slice(0, fileName.lastIndexOf('.pdf'));

        return (
            <Link to={basePath + '/' + storyName}>
                <h4>{storyName}</h4>
            </Link>
        );
    }

    function changePage(dir) {
        if (pageNum + dir > 0 && pageNum + dir <= numPages) {
            setPageNum(pageNum + dir);
        }
    }

    function goto(num) {
        if (num > 0 && num <= numPages) {
            setPageNum(num);
        } else {
            alert('Invalid input detected.');
        }
    }

    return (
        <div className="stories">
            <h1>{title}</h1>
            <Switch>
                <Route path={basePath + "/Index"}>
                    {responded ? response.split(',').map((str) => renderLink(str)) : 'Retrieving file names...'}
                    <p>
                        This is where some of my writing projects are. I spent quite a bit of time figuring out how to fetch pdfs from Express and displaying them properly. 
                        Unfortunately react-pdf doesn't work well with sticky headers, so I had to scrap that.
                    </p>
                </Route>
                <Route path={basePath + "/:title?"}>
                    <div className="wrapper">
                        <header
                            style={{padding:'1vh'}}>
                            <ul style={{ margin: '0 0 auto', display: 'inline-block' }}>
                                <button onClick={() => goto(1)}>
                                    Start
                                </button>
                                <button onClick={() => changePage(-1)}>
                                    {pageNum - 1 > 0 ? 'Prev Page' : 'At First Page'}
                                </button>
                                <button onClick={() => changePage(1)}>
                                    {pageNum + 1 <= numPages ? 'Next Page' : 'At Last Page'}
                                </button>
                                <button onClick={() => goto(numPages)}>
                                    End
                                </button>
                            </ul>
                        </header>
                        <header
                            style={{ padding: '1vh' }}>
                            <ul style={{ margin: '0 0 auto', display: 'inline-block' }}>
                                <textarea
                                    style={{height:'3vh'}}
                                    value={skipTo} onChange={(event) => { setSkipTo(event.target.value) }} />
                                <button
                                    style={{ height:'3vh' }}
                                    onClick={() => goto(parseInt(skipTo, 10))}>
                                    {'Go To Page ' + skipTo}
                                </button>
                            </ul>
                        </header>
                        <header>
                            <ul style={{ margin: '0 0 auto', display: 'inline-block' }}>
                                <Link to={basePath + "/index"}>
                                    <button style={{ float: "right", width: "10vh" }}>
                                        Index
                                    </button>
                                </Link>
                            </ul>
                        </header>
                        <p>{'Page ' + pageNum + ' of ' + numPages}</p>
                        <Document
                            style={{ paddingbottom: '10vh' }}
                            file={'/api/stories/' + title}
                            onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
                            onLoadError={(err) => setError(err.message)}
                            onSourceError={(err) => setError(err.message)}
                        >
                            <Page
                                style={{ position: 'relative', zIndex: '0' }}
                                onLoadError={(err) => setError(err.message)}
                                renderMode='canvas'
                                pageNumber={pageNum}
                            />
                        </Document>
                        <p>{'/api/stories/' + title}</p>
                    </div>
                </Route>
            </Switch>
            <p>{error !== '' ? 'Something has gone wrong. Please report the following error. ' + error : ''}</p>
        </div>
    );
}

// ========================================

/*ReactDOM.render(
    
    <Game />,
    document.getElementById('root')
);*/
