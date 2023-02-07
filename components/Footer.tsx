import person from "./images/person3.png";
import { useState, useEffect, Component } from "react";
import Image from "next/image";


export const Footer = () => {



    return (
        <>



            <div className="footer footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 copyright">
                            <p>Copyright &copy; City Market. All Rights Reserved</p>
                        </div>

                        
                    </div>
                </div>
            </div>
            <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>


            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
            <script src="/lib/easing/easing.min.js"></script>
            <script src="/lib/slick/slick.min.js"></script>
            
            <script src="/js/main.js"></script>
        </>
    )
}

