import React from "react";

function Footer() {
  return (
    <footer className="mt-24 text-gray-400 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap">
          <div className="w-full md:w-1/2">
            <h6 className="text-white text-lg uppercase mb-4">About</h6>
            <p className="text-justify">
              We value your feedback and are here to assist you with any
              questions or concerns. Please reach out to us through our contact
              page or connect with our support team directly. Join us on our
              journey to improve written communication, one sentence at a time.
              Thank you for choosing Magic Gadget! For more information, visit
              our homepage or explore our features in detail.
            </p>
          </div>

          <div className="w-1/2 md:w-1/4 pl-12">
            <h6 className="text-white text-lg uppercase mb-4">Categories</h6>
            <ul className="list-none">
              <li className="mb-2">
                <a href="/" className="hover:text-blue-400">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="checking" className="hover:text-blue-400">
                  Checking Spelling
                </a>
              </li>
              <li className="mb-2">
                <a href="checking/grammar" className="hover:text-blue-400">
                  Checking Grammar
                </a>
              </li>
              <li className="mb-2">
                <a href="blog" className="hover:text-blue-400">
                  BLOG
                </a>
              </li>
              <li className="mb-2">
                <a href="premium" className="hover:text-blue-400">
                  Premium
                </a>
              </li>
            </ul>
          </div>

          <div className="w-1/2 md:w-1/4">
            <h6 className="text-white text-lg uppercase mb-4">Quick Links</h6>
            <ul className="list-none">
              <li className="mb-2">
                <a className="hover:text-blue-400">About Us</a>
              </li>
              <li className="mb-2">
                <a className="hover:text-blue-400">Contact Us</a>
              </li>
              <li className="mb-2">
                <a className="hover:text-blue-400">Contribute</a>
              </li>
              <li className="mb-2">
                <a className="hover:text-blue-400">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a className="hover:text-blue-400">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap mt-8">
          <div className="w-full md:w-2/3 text-center md:text-left">
            <p className="text-gray-500">
              Copyright &copy; 2024 All Rights Reserved by{" "}
              <a href="#" className="hover:text-blue-400">
                Quang Hieu
              </a>
              .
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <ul className="list-none flex space-x-4">
              <li>
                <a className="hover:text-blue-400" href="#">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a className="hover:text-blue-400" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a className="hover:text-blue-400" href="#">
                  <i className="fab fa-dribbble"></i>
                </a>
              </li>
              <li>
                <a className="hover:text-blue-400" href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
