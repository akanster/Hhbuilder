// Hhbuilder solution.
(function () {
  "use strict";

  /** Household the user will be adding users to. */
  var householdList = [];

  /** Reference to the pre.debug element. */
  var debugEl = document.querySelector("pre.debug");

  /** Reference to the form element. */
  var formEl = document.querySelector("form");

  /** Ordered list element used to display the current household. */
  var householdListEl = document.querySelector("ol.household");

  /** Reference to the add button. */
  var addBtn = document.querySelector('button[class="add"');

  /**
   * Display all people entered to the household in list format, each with a
   * corresponding button to remove the entry.
   */
  function displayHousehold() {
    /** Clear the contents of the list, it will be rebuilt from scratch each time. */
    householdListEl.innerHTML = "";

    /** Create a DOM node for each person in the household and add
     * item to the ol list. */
    householdList.forEach(function (person, index) {
      var listItemEl = document.createElement("li");

      // prettier-ignore
      var listItemText = document.createTextNode(
        "Age: " + person.age +
          " - Relationship: " + person.relationship +
          " - Smoker: " + person.smoker + " "
          );

      listItemEl.appendChild(listItemText);
      householdListEl.appendChild(listItemEl);

      /** Remove button with an `X`. */
      var removeBtn = document.createElement("button");
      var removeText = document.createTextNode("X");
      removeBtn.appendChild(removeText);
      listItemEl.insertAdjacentElement("beforeend", removeBtn);

      /** When the button is clicked, remove the person from the household. */
      removeBtn.addEventListener("click", function() { removePerson(index); }); // prettier-ignore
    });
  }

  /**
   * Returns the value of the `Age` input field as a Number type.
   */
  function getAge() {
    var age = formEl.querySelector("input[name=age]").value;
    return Number(age);
  }

  /**
   * Returns the value of the current `Relationship` selection.
   */
  function getRelationship() {
    var relationship = formEl.querySelector("select[name=rel]").value;
    return relationship;
  }

  /**
   * Returns the value of the `Smoker` checkbox.
   */
  function getSmoker() {
    var smoker = formEl.querySelector("input[name=smoker]").checked;
    return smoker;
  }

  /**
   * Removes a person from the householdList at the given postion and
   * displays the updated household.
   * @param {Number} index Position in the array to be removed.
   */
  function removePerson(index) {
    householdList.splice(index, 1);
    displayHousehold();
  }

  /**
   * Resets the values of the `Age`, `Relationship` and `Smoker` to their defaults.
   */
  function resetForm() {
    formEl.querySelector("input[name=age]").value = null;
    formEl.querySelector("select[name=rel]").value = "";
    formEl.querySelector("input[name=smoker]").checked = false;
  }

  /**
   * Register a function as a click event handler for the add button. The function
   * will validate user input, add the person to the household and clear the input
   * fields to prepare for another addition.
   */
  addBtn.onclick = function (event) {
    event.preventDefault();

    /** If any errors occur, the message to display to the user regarding the error(s)
     * will be appended to this string. If the string is empty, no errors have occured. */
    var errorMessage = "";

    /** Age must be provided and valid. */
    var age = getAge();
    if (!age || age < 1) {
      errorMessage += "Invalid age \n";
    }

    /** Relationship must be selected. */
    var rel = getRelationship();
    if (!rel) {
      errorMessage += "Relationship is required";
    }

    /** Get smoker status. */
    var smoker = getSmoker();

    /** Error has occured, alert user and exit. */
    if (errorMessage) {
      return alert(errorMessage);
    }

    /** Validation passed, build the person to be added. */
    var person = {
      age: age,
      relationship: rel,
      smoker: smoker,
    };

    /** Add person to household. */
    householdList.push(person);

    /** Display the updated household to the user. */
    displayHousehold();

    /** Reset the form for the next entry. */
    resetForm();
  };

  /**
   * Register a handler for the form submit event. When the submit button is
   * clicked, form will display a serialized JSON of the household in the
   * debug element on the page.
   */
  formEl.onsubmit = function (event) {
    event.preventDefault();

    resetForm();
    debugEl.innerHTML = JSON.stringify(householdList);
    debugEl.style.display = "block";
  };
})();
