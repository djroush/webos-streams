String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};


function getFuzzyDuration(seconds) {
	var result;
    if (seconds < 0) {
    	return "The future";
    } else if (seconds < 3) {
    	return "Now";
    } else if (seconds < 60) {
    	result = seconds;
    	return result + ' seconds ago';
    } else if (seconds < 3600) {
    	result = Math.floor(seconds/60); 
    	return result + ' minute' + (result === 1 ? '': 's') + ' ago';
    } else if (seconds < 86400) {
    	result = Math.floor(seconds/3600); 
    	return result + ' hour' + (result === 1 ? '': 's') + ' ago';
    } else if (seconds < 2628300) {
    	result = Math.floor(seconds/86400); 
    	return result + ' day' + (result === 1 ? '': 's') + ' ago';
    } else if (seconds < 31556952) {
    	result = Math.floor(seconds/2628300); 
    	return result + ' month' + (result === 1 ? '': 's') + ' ago';
    } else {
    	result = Math.floor(seconds/31556952);
    	return result + ' year' + (result === 1 ? '': 's') + ' ago';
    }
}

//Test cases:
// inputs: 25h20m39s,  16h4m8s,  3h5m7s,  49m12s, 5m23s, 3m2s
//outputs: 25:20:39 ,  16:04:08, 3:05:07, 49:12,   5:23, 3:02
function formatDuration(input) {
    var numbers = input.split(/[hms]/).filter(i => i.length > 0);
    var mapped = numbers.map((x,i) => i === 0 ? x : x.padStart(2, '0'));
    var filtered = mapped.filter((x, i) => i > 0 || x != '0');
    var fixed = filtered.join(':');
    return fixed;
}