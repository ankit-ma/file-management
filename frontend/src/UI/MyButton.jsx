function MyButton(props) {
  return (
    <>
      <button
        className="bg-red-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={props.buttonHandler}
      >
        {props.buttonName}
      </button>
    </>
  );
}
export default MyButton;
