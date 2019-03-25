# Dynamic Effects

This repository provides the source code for the three Dynamic Effects in [Activating Chart Project](https://vizgroup.github.io/activateviz/)

- [Marching Ants](#marching-ants)

- [Geometry Deformation](#geometric-deformation)

- [Gradual Appearance](#gradual-appearance)

*File Structure*

	- lib: //3rd party library
	- src: //core code
	- examples: //examples to demonstrate the usage of API
		- marchingant.html //marching ants
		- gradualappearance.html //gradual appearance	
		- geometrydeformation.html //geometry deformation
	- API.md //API document
	

## Marching Ants

<img src="https://github.com/vizgroup/DynamicEffect/blob/master/rc/marchingant.png" height="150">


###### API

```
marchingAnt(Visual_proxy(Ant), Path, Boundary, Speed, Space, Color)
```

###### Example

./example/marchingant.html

###### Parameters

- Visual_proxy: the ant shape defined by a point list (Visual_proxy also define the original position of ant marching),  e.g.,
	```
	Visual_proxy = [[100, 300], [300, 350], [100, 200]] // to define a triangular Ant. 
	```

- Path: the path that the ants march, defined by a point list, e.g., 
	```
	Path = [[100, 100], [200, 200], ...] // where [x_i, y_i] is the i_th dot
	```
  
- Boundry: the shape bounds ants, defined by a point list, e.g., 
	```
	Boundary = [[100, 100], [300, 100], [300, 300], [100, 300] // to define a rectangular boundary
	```

- Speed: the speed that the ant marches, e.g., 
	```
	Speed = 20 //scaled in range[10, 30]; the bigger, the faster. 
	```

- Space: the gap between ants, e.g.,
	```
	Space = 10 //scaled in range[10, 30]; the bigger, the sparser.
	```

- Color: ant's color
	```
	Color = "#aabbcc"
	```

## Geometry Deformation

<img src="https://github.com/vizgroup/DynamicEffect/blob/master/rc/geometrydeformation.png" height="150">


###### API

```
geometryDeformation (Visual_proxy, Focal, Bandwidth, Speed)
```

###### Example

./example/geometrydeformation.html

###### Parameters

- Visual_Proxy: the element of which you want to add the effect of geometric deformation, e.g., 
	
	```
	Visual_Proxy = d3.select('path')	//a SVG element, such as the path element

- Focal: the center point of GD effect, e.g., 
	```
	Focal = [50, 50] 
   	```
         
- Bandwidth: the extent GD amplifies, i.e. the maximum radius of a fisheye deformation, e.g., 
	```
	Bandwidth = 50 
	```
- Speed: the speed GD changes, e.g., 
	```
	Speed = 20 //scaled in range[10, 30]; the bigger, the faster. 
    ```     

## Gradual Appearance

<img src="https://github.com/vizgroup/DynamicEffect/blob/master/rc/gradualappearance.png" height="150">

###### API

```
gradualAppearance (Visual_Proxy, Offset, Repetition, Speed)
```

###### Example  

./example/gradualappearance.html

###### Parameters
- Visual_Proxy: the element of which you want to add the effect of gradual appearance, e.g.,

	```
	Visual_Proxy = d3.select('circle') //a SVG element, such as the circle element

	```

- Offset: the time when GA effect begins to appear, e.g., 
	```
	Offset = 3 //the begin index of unit, in terms of speed
	```

- Repetition: the number of times GA occurs, e.g.,
	``` 
	Repetition = 4 //occurs 4 times
	```

- Speed: the speed GA changes, e.g.,
	``` 
	Speed = 20 //scaled in range[10, 30]; the bigger, the faster.   
	```
