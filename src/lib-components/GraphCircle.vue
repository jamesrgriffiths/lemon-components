<!--
  Graphs a circle or pie chart based on the following parameters:
  data - (REQUIRED) This should be an array of objects with the following: name, total
  limit - (OPTIONAL - DEFAULT 10) This will limit how many data points are shown. Remaining points are summed into an other field.
  size - (OPTIONAL - DEFAULT 200) This is the size of the actual graph (width and height), not the entire component.
  padding - (OPTIONAL - DEFAULT 10) This provides space on all sides around the graph.
  cutout - (OPTIONAL - DEFAULT 0) This represents the radius of a circle to draw in the center, turning a pie chart into a circle chart.
 -->
<template>

  <div class="gc-container" id="gc-container" :style="'width: '+box_size+'px'">

    <svg  class="gc-pie" :width="box_size" :height="box_size" :viewBox="'0 0 '+box_size+' '+box_size">
      <path v-for="item in data" :d="item.path"
        :transform="'translate('+padding+','+padding+') rotate('+(item.rotation)+' '+size/2+' '+size/2+')'"
        :class="'gc-piece '+item.color_class"/>
      <circle :cx="(size/2)+padding" :cy="(size/2)+padding" :r="cutout" class="gc-pie-inner" />
    </svg>

    <div v-for="item in data" :class="'gc-text '+item.color_class">
      {{item.name}} ({{item.total}})
    </div>

  </div>

</template>

<script>
export default {
  props: {
    data: { default: () => [] },
    limit: {
      default: 10,
      validator(x) { return x > 0; }
    },
    size: { default: 200 },
    padding: { default: 10 },
    cutout: { default: 0 }
  },
  data() {
    return {
      box_size: 0
    }
  },
  created() {

    // Set the box size
    this.box_size = parseInt(this.size) + parseInt(this.padding*2);

    // Get the totals;
    var total = 0;
    var other_total = 0;
    for(var i=0; i<this.data.length; i++) {
      total += this.data[i].total;
      if(i+1 >= this.limit) {
        other_total += this.data[i].total;
      }
    }

    // Remove and replace additional items with the other variable
    while(this.data.length >= this.limit) {
      this.data.pop();
    }
    if(other_total > 0) {
      this.data.push({'name': 'Other', 'total': other_total});
    }

    // Set the sizing and color of each item
    var radius = this.size / 2;
    var radian_multiplier = 6.2831853;
    var width = 20;
    var rotation = 0;
    for(var i=0; i<this.data.length; i++) {
      var fraction = this.data[i].total / total;
      var x = (radius * Math.sin(fraction * radian_multiplier)) + radius;
      var y = fraction == 0.25 ? radius : radius - (radius * Math.cos(fraction * radian_multiplier));

      var curve = "";
      if(fraction > 0.5) { curve += "A "+radius+" "+radius+" 0 0 1 "+(radius*2)+" "+radius+" "; }
      if(fraction > 0.75) { curve += "A "+radius+" "+radius+" 0 0 1 0 "+radius+" "; }
      curve += "A "+radius+" "+radius+" 0 0 1 "+x+" "+y+" ";

      var start = "M "+radius+" 0 ";
      var line = "L "+radius+" "+radius+" ";
      var path = start + curve + line + "Z"
      this.data[i].path = path;
      this.data[i].rotation = rotation;
      rotation += fraction * 360;

      this.data[i].color_class = 'gc-color-'+((i%30)+1);
    }

  }
}
</script>
