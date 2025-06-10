import { faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Contanct() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <ul className="contact_list">
        <li className="contact_list-item">
          <FontAwesomeIcon
            className="contact_list-item-icon"
            icon={faMailBulk}
            color="blue"
          />
          <p>
            Mail: <span>contact@email.com</span>
          </p>
        </li>
        <li className="contact_list-item">
          <FontAwesomeIcon
            className="contact_list-item-icon"
            icon={faPhone}
            color="green"
          />

          <p>
            Phone: <span>+995598776012</span>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Contanct;
