import Blogitem from './blogitem';
import ErrorBoundary from './ErrorBoundary';
const Blog = () => {
  return (
    <div>

        <ErrorBoundary>
          <Blogitem/>
        </ErrorBoundary>

    </div>
  )
}

export default Blog