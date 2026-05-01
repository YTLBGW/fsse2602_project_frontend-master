import TopNavBar from "../../components/TopNavBar.tsx";

export default function ErrorPage() {
  return (
      <>
        <TopNavBar/>
        <div
        className="d-flex align-items-center justify-content-center"
        style={{height:'50vh'}}
        >
          <img src="https://i.pinimg.com/originals/0d/05/20/0d05201572964220c7c3b6ceab245bd8.gif"
               height="600px"
               alt="Error Page"
          />
        </div>

      </>
  )
}