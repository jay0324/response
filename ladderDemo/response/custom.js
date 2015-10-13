$(function() {
	$.JResponsive({
		defaultMenuObj: "#nav"
	});


	//錯位效果
    $("#obj0").JResLadderObj({
        //setupMode: 'setup',
        position: 'fixed',
        path: {
                0:{
                    speed: 1,
                    start:{
                        ladder: 0,
                        x: 400,
                        y: 1000,
                        z: 2
                    },
                    end: {
                        ladder: 600,
                        x: 800,
                        y: 100,
                        z: 2
                    } 
                }
        }
    });

	$("#obj1").JResLadderObj({
		//setupMode: 'setup',
		position: 'absolute',
		container: '#row1',
        path: {
                0:{
                    speed: 1,
                    start:{
                        ladder: 0,
                        x: 10,
                        y: 10,
                        z: 0
                    },
                    end: {
                        ladder: 200,
                        x: 1000,
                        y: 600,
                        z: 1
                    } 
                }
        }
	});

	$("#obj2").JResLadderObj({
		//setupMode: 'setup',
		position: 'absolute',
		container: '#row1',
        path: {
                0:{
                    speed: 1,
                    start:{
                        ladder: 0,
                        x: 1800,
                        y: 10,
                        z: 0
                    },
                    end: {
                        ladder: 400,
                        x: 10,
                        y: 400,
                        z: 1
                    } 
                }
        }
	});

    $("#obj3").JResLadderObj({
        //setupMode: 'setup',
        position: 'absolute',
        container: '#row3',
        path: {
                0:{
                    speed: 1,
                    start:{
                        ladder: 700,
                        x: 0,
                        y: 800,
                        z: 0
                    },
                    end: {
                        ladder: 1200,
                        x: 0,
                        y: 0,
                        z: 1
                    } 
                }
        }
    });

    $("#obj4").JResLadderObj({
        //setupMode: 'setup',
        position: 'absolute',
        container: '#row4',
        path: {
                0:{
                    speed: 1,
                    start:{
                        ladder: 1200,
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    end: {
                        ladder: 1500,
                        x: 0,
                        y: 800,
                        z: 1
                    } 
                }
        }
    });

 })