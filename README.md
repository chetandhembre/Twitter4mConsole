Twitter4mConsole
================

This is app which will help developer like us to tweet from ubuntu terminal 

<h1>How to install</h1>
Respository contain <code>tweet</code> file which you need to add <code>/usr/local/bin</code> file so that you can access <code>tweet</code> command from any place.

<h2>How to Use ? </h2>

<ul>
    <li>
        run commond <code> tweet -l </code> to get started 
        this will open <a href="http://consoletweet.herokuapp.com/">this</a> in you default browser. After login you 
        will get oauth id
    </li> 
    <li>
       run command <code> tweet -a oauthid </code>. <code>oauthid</code> is you recieved after login. this will one time
       process 
    </li>
    <li> 
       run commond <code> tweet -t text </code> . <code> text </code> should be in double qoutes. You can have
       text without qoutes but shell script wont consider special characters. You can find special character in shell 
       script on internet
    </li>
    <li> 
        you can get help using <code> tweet --help </code> 
    </li>
</ul>

<h2>TODO</h2>
<ul>
   <li>
       create installer in ubuntu
   </li>  
</ul>
