$(document).ready(function() {
    //Trigger click load or press enter
    $("#channelInput").keyup(function( event ) {
        if (event.originalEvent.code === 'Enter') {
            loadChannel();
        }
    });
    $("#loadButton").click(function() {
        loadChannel();
    });
    
    $(".tabNav a").click(function(e) {
        var tab=e.target.text.toLowerCase();
        
        if (tab) {
            activateTab(tab);
            var user = retrieveUser();
            loadTab(user.id);
        }
    })
})

function loadChannel() {
    var channel=$("#channelInput").val();
    if (channel && !channel.isEmpty()) {
    	$("#tabsContainer .tab").empty();
        getUser(channel);
    }
};

function loadTab(userid) {
    //Load data on the active tab
    var activeTab = $(".tabNav.active a").text();
    if (activeTab && userid) {
        switch(activeTab) {
        case 'Stream': 
            getStream(userid);
            //getStreamCallback(undefined);
            break;
        case 'Videos':
            getVideos(userid);
            //getVideosCallback(getVideosResponse);
            break;
        case 'Clips':
        	getClips(userid);
        	//getClipsCallback(getClipsResponse);
            break;
        case 'Followers':
            break;
        default: console.warn("Invalid tab (" + activeTab + ") while attempting to load data");
        }
    }
}

function activateTab(clickedTab) {
    $(".tabNav.active").removeClass("active");
    $('#' + clickedTab + 'Nav')[0].parentElement.classList.add("active");
    $(".tab.active").removeClass("active");
    var activeTab = $("#" + clickedTab);
    activeTab.addClass("active");
    activeTab.empty();
    if (clickedTab === 'stream') {
        activeTab.append('<div id="twitch-embed"></div>');
    }
}

function videoClickListeners() {
    $(".video a").click(function(event) {
    	var videoid = event.currentTarget.getAttribute("data-id");
    	activateTab("stream");
        playVideo(videoid);
    });
}

function clipsClickListeners() {
    $(".clips a").click(function(event) {
    	var clipid = event.currentTarget.getAttribute("data-id");
    	activateTab("stream");
        playVideo(clipid);    	
    });
}
