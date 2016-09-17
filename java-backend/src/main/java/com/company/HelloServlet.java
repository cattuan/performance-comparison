package com.company;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloServlet extends HttpServlet{

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) 
                                                    throws IOException{        
        PrintWriter out = res.getWriter();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content-Type, Accept");         
        res.setContentType("text/html");
        res.setStatus(200);
        out.print("<h2>Hello world!</h2>");
    }
}

