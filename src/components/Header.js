// const Header = (props) => {
//     return (
//         <header className="App-header">
//             <h2>{props.text}</h2>
//         </header>
//     );
// };
//
// export default Header;


const Header = ({text, onClick}) => {
    return (
        <header className="App-header" onClick={onClick}>
            <h2>{text}</h2>
        </header>
    );
};

export default Header;