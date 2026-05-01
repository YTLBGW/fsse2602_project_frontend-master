import TopNavBar from "./TopNavBar.tsx";

export default function LoadingContainer() {
  return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{height:'50vh'}}
        >
          <img src="https://cdnb.artstation.com/p/assets/images/images/055/908/871/original/timothe-muller-pika-running.gif?1668011191"
               height="600px"
               alt="Loading"
          />
        </div>
  )
}