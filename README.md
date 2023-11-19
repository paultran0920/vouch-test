**Date of submission:** 19 Nov

**Instructions to run assignment locally**

- Step 1: Install the docker on your local if you still have not yet installed it. See more at https://docs.docker.com/engine/install/
- Step 2: Download the source code from https://github.com/paultran0920/vouch-test/archive/refs/heads/main.zip then extract it
- Step 3: go to the project root folder then run
  ```sh
  cd local-test
  docker-compose up
  ```
  Note: it should take some minutes to download and build the docker images for the first time. Please wait until you see this logs

  <img width="994" alt="image" src="https://github.com/paultran0920/vouch-test/assets/111500186/fbf372d6-5856-4998-915d-e9cccfe8422d">

- Step 4: Open the application with the URL http://localhost:13000/ on the browsers to see how it works.

  It should be like this

  <img width="644" alt="image" src="https://github.com/paultran0920/vouch-test/assets/111500186/646fbde8-4599-4ca8-bfb2-a318200aae27">

  <img width="994" alt="image" src="https://github.com/paultran0920/vouch-test/assets/111500186/fd26869d-aa91-46f4-b6db-6556cc4151e7">


**Time spent:** about 10 hours.

**Assumptions made:**
- The application can run on both mobile and desktop browsers.

**Shortcuts/Compromises made:**

- User authentication/authorization module

- Chat room management

- Chat message reaction

- Rich text chat message

**Assume your application will go into production…**

- What would be your approach to ensuring the application is ready for production (testing)?

  * We should have a test plan for our application before go live

    - Test cases: what are the test cases of this application, we need to define it. 100% of P1, 80% of P2 and 50% of P3 test cases must be passed.

    - Unit Test: the code coverage of the Backend should be 80% at least and 50% for the Frontend.

    - E2E Test: it makes sure that the real application works as expected.

- How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?

  * Performance Test: Depending on the real situation, how many users we need to support, and the large of data can we have, ... then we need to define the test cases to test the performance of the application.

- What key steps would you take to ensure application security?

  * Security Testing: help to detect security vulnerabilities, the problem from malicious attacks, unauthorized access, and data breaches..

**What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.**

  All requested feature has been implemented.

**Other information about your submission that you feel it's important that we know if applicable.**

N/A

**Your feedback on this technical challenge**

N/A
