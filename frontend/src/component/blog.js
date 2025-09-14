import Blogitem from './blogitem';
import ErrorBoundary from './ErrorBoundary';
const blog = () => {
  return (
    <div>

        <ErrorBoundary>
          <Blogitem/>
        </ErrorBoundary>

    </div>
  )
}

export default blog