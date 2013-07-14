url="http://consoletweet.herokuapp.com/authtoken"

#use to encode data send for curl request
function dataEncode() {
  local tweet="$@"
  local character=('%' ';' '?' '\/' ':' '#' '&' '=' '+' ',' ' ' '<' '>' '~' '!')
  local replace=('%25' '%3B' '%3F' '%2F' '%3A' '%23' '%26' '%3D' '%2B' '%2C' '%20' '%3C' '%3E' '%7E' '%21')
  for i in "${!character[@]}"
  do 
      tweet=$(echo $tweet | sed -e "s/${character[$i]}/${replace[$i]}/g")
  done
  
  #can not return string 
  echo $tweet   
  
} 

#use to send tweet from console over curl 
function tweetIt() {
  local tweet="$@"
  local oauth=`cat \demo.txt`
  local query="oauth=$oauth&tweet=$tweet"
  echo $query
  #curl http://consoletweet.herokuapp.com/sendtweet?$query
  #curl http://justunfollow.net:5000/sendtweet?$query
	  
}

function start() {
	if [ "$1" == "-a" ]; then
                #check if second argument present or not
                if [ -z "$2" ];	then
                    #if second argument is not present then throw error message 
		    echo "There has to be second argument"
                    exit 1
                else
                    #store second argument in file 
 		    touch demo.txt
		    echo "$2" > demo.txt
		fi

	elif [ "$1" == "-l" ]; then
	    {   #try block
               #open website url in default browser  
	       xdg-open $url 
	    } || { # your 'catch' block
               #throw error message
	       echo 'we can login by visiting http://consoletweet.herokuapp.com/authtoken' 
               exit 1
	    }
 
	elif [ "$1" == "-t" ]; then
		#command use for tweeting text  
		i=0;
		for var in "$@" 
		do
		   i=$(expr $i + 1)
		   # check first argument should not consider as tweet text
		   if [ "$i" != "1" ]; then
		     tweet="$tweet $var"
		   fi
		    	
		done 
                #use to encode data 	
		tweet=$( dataEncode $tweet )
                #send tweet 
                tweetIt $tweet 

	elif [ "$1" == "--help" ]; then
	     echo "tweet -a oauthId [oauth id is given by our login system]"
	     echo "tweet -t tweet [tweet: text to be tweet]"
	     echo "tweet -l - use to login"

	else
	     echo "commond not found try tweet --help"     
	fi
  exit 1;
}

#calling start method
start "$@"
