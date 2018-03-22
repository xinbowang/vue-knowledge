import SVG from './svg.min';
class CreatCircle{
	constructor(json) {
		this.title = '';
		this.outTxt = 0;
		this.inTxt = 0;
		this.textPaths = '';
		this.errs = '';
		this.afterColor = '#ededed';
		this.inColor = '#fc0';
		this.btnShow = false;
    this.measureColor = '#f00';
    this.learnColor = '#0f0';
    this.reportColor = '#00f';
		for(let i in json) {
			switch(i) {
				case 'id':
					this.id = json[i];
					break;
				case 'title':
					this.title = json[i];
					break;
				case 'outTxt':
					this.outTxt = json[i];
					break;
				case 'inTxt':
					this.inTxt = json[i];
					break;
				case 'textPaths':
					this.textPaths = json[i];
					break;
				case 'errs':
					this.errs = json[i];
					break;
				case 'afterColor':
					this.afterColor = json[i];
					break;
				case 'outColor':
					this.outColor = json[i];
					break;
				case 'inColor':
					this.inColor = json[i];
					break;
        case 'btnShow':
          this.btnShow = json[i];
          break;
        case 'measureColor':
          this.measureColor = json[i];
          break;
        case 'learnColor':
          this.learnColor = json[i];
          break;
        case 'reportColor':
          this.reportColor = json[i];
          break;
				default: return
			}
		}
    if(this.outTxt == 0) {
      this.outColor = 'none';
    }
		// this.title = '数与代数';
		// this.outTxt = 100; // 传入的参数-百分比
		// this.inTxt = 100; // 传入的参数-百分比
		// this.textPath = '已达标'
		// this.err = '正确率'
		// 常量
		this.MAX_LEN = 6;
		this.FONT_SIZE = 16;
		this.SVG_WIDTH = 200;
		this.SVG_HEIGHT = 200;
		this.D1 = 184;
		this.D2 = 152;
    this.tspans = this.tspans.bind(this);
    this.creatSvg = this.creatSvg.bind(this);
	}
	creatSvg() {
		// 创建SVG
		this.draw = SVG(this.id);
		// 根据盒子宽度缩放
		this.draw.viewbox({ x: 0, y: 0, width: this.SVG_WIDTH, height: this.SVG_HEIGHT })
	}
	tspans(draw, str, color) {
		this.strLen = str.length;
		this.tspans = Math.ceil (this.strLen / this.MAX_LEN);
		this.strs = ''
		// 文本超过6个长度换行
		for(let i=0; i<this.tspans; i++) {
			this.strs += str.substr(i * this.MAX_LEN, this.MAX_LEN) + '\n'
		}
		// 绘制文字并添加颜色
		this.text = this.draw.text(this.strs).fill(color).addClass('title');
		this.text.font({
		  family:   'Helvetica'
		, size:     this.FONT_SIZE
		, leading:  '1.3em'
		, anchor:   'middle'
		})
		// 文本水平垂直居中
		if(this.tspans > 1){
			this.text.move((this.SVG_WIDTH) / 2, (this.SVG_WIDTH - this.tspans * this.FONT_SIZE) / 2)
		} else {
			this.text.move((this.SVG_WIDTH) / 2, (this.SVG_WIDTH - this.FONT_SIZE) / 2)
		}
	}
}

class DoubleCircle extends CreatCircle{
	constructor(json) {
		super(json);
		this.def = 32;
		this.maxScale = 0;
	  this.BOUND = 4;
		this.def2 = 28;
		this.D1 = 200
		this.creatCircle = this.creatCircle.bind(this);
	}
	creatCircle() {
		this.creatSvg();
		// 径向渐变-模板
		this.radial = this.draw.gradient('radial', function(stop) {
			stop.at(0.7, '#172136')
		  stop.at(1, '#25344f')
		});
		// 计算周长
	  this.PD1 = Math.PI * this.D1;
    this.rangeValues = 100 / 3 / 100;
	  // 绘制外圆形--背景
		this.outCir = this.draw.circle(200).fill(this.radial);

    // 达标否
    this.path2 = 'M 0,114 a 100,105 0 1,1 0,1 z';
    if(this.textPaths) {
      let _this = this;
      this.textPath = this.draw.text(function(add) {
        add.tspan(_this.textPaths).dy(11)
      });
      this.textPath.path(this.path2).
          font({size: 12, fill: '#fff'}).
          rotate(0).
          move(142, 0)
    }
    if(this.btnShow) {
      // 裁切
      this.clip = this.draw.clip();

      this.pathCircle = this.outCir.clone().size(120).move(40, 40).attr({'style': 'transition: all 0.2s;'});
      this.pathCircle2 = this.pathCircle.clone();
      this.pathCircle3 = this.pathCircle.clone();

      // 绘制-按钮-测评、学习，报告
      this.outCircle = this.outCir.clone().fill('none').stroke({ width: 200, color: this.measureColor}).move(0, 0);
      this.outCircle.attr({
        'stroke-dasharray': `${this.PD1 * this.rangeValues} ${this.PD1 * (1 - this.rangeValues)}`
      }).rotate(30)

      this.outCircle2 = this.outCircle.clone().stroke({color: this.learnColor}).move(0, 0).rotate(150);

      this.outCircle3 = this.outCircle.clone().stroke({color: this.reportColor}).move(0, 0).rotate(270);

      this.outCircle.clipWith(this.pathCircle).addClass('outMeasurement').attr({'style': 'cursor: pointer'});
      this.outCircle2.clipWith(this.pathCircle2).addClass('outLearning').attr({'style': 'cursor: pointer'});
      this.outCircle3.clipWith(this.pathCircle3).addClass('outReport').attr({'style': 'cursor: pointer'});
      // 按钮文字
      this.txt = this.draw.text('点击测评').move(75, 174).font({'font-size': '14px'}).addClass('measurement').opacity(0).attr({'style': 'cursor: pointer'});
      this.txt2 = this.draw.text('学习资源').move(0, 60).font({'font-size': '14px'}).addClass('learning').opacity(0).rotate(295).attr({'style': 'cursor: pointer'});
      this.txt3 = this.draw.text('评估报告').move(145, 60).font({'font-size': '14px'}).addClass('report').opacity(0).rotate(60).attr({'style': 'cursor: pointer'});

      // 鼠标划入事件 - 按钮显示
      let _this = this;
      this.draw.mouseover(function() {
        _this.pathCircle.size(200,200).move(0, 0)
        _this.pathCircle2.size(200,200).move(0, 0)
        _this.pathCircle3.size(200,200).move(0, 0)
        _this.txt.opacity(1);
        _this.txt2.opacity(1);
        _this.txt3.opacity(1);
        _this.textPath.opacity(0);
      })
      this.draw.mouseout(function() {
        _this.pathCircle.size(120,120).move(40, 40);
        _this.pathCircle2.size(120,120).move(40, 40);
        _this.pathCircle3.size(120,120).move(40, 40);
        _this.txt.opacity(0);
        _this.txt2.opacity(0);
        _this.txt3.opacity(0);
        _this.textPath.opacity(1);
      })
      this.outCircle.mouseover(function() {
        _this.txt.fill('#fff');
        this.opacity(0.8);
      })
      this.outCircle.mouseout(function() {
        _this.txt.fill('#000');
        this.opacity(1);
      })
      this.txt.mouseover(function() {
        this.fill('#fff');
        _this.outCircle.opacity(0.8);
      })
      this.txt.mouseout(function() {
        this.fill('#000');
        _this.outCircle.opacity(1);
      })

      this.outCircle2.mouseover(function() {
        _this.txt2.fill('#fff');
        this.opacity(0.8);
      })
      this.outCircle2.mouseout(function() {
        _this.txt2.fill('#000');
        this.opacity(1);
      })
      this.txt2.mouseover(function() {
        this.fill('#fff');
        _this.outCircle2.opacity(0.8);
      })
      this.txt2.mouseout(function() {
        this.fill('#000');
        _this.outCircle2.opacity(1);
      })
      this.outCircle3.mouseover(function() {
        _this.txt3.fill('#fff');
        this.opacity(0.8);
      })
      this.outCircle3.mouseout(function() {
        _this.txt3.fill('#000');
        this.opacity(1);
      })
      this.txt3.mouseover(function() {
        this.fill('#fff');
        _this.outCircle3.opacity(0.8);
      })
      this.txt3.mouseout(function() {
        this.fill('#000');
        _this.outCircle3.opacity(1);
      })
    }

		// 鼠标划入事件
		// this.txt.mouseover(function() {
		//   this.fill({ color: '#fff' })
		// })
		// this.txt.mouseout(function() {
		//   this.fill({ color: '#000' })
		// })
    // 绘制外圆形--达标圆
    this.outCir2 = this.outCir.clone().fill(this.outColor);

		// 绘制内圆形
		this.draw.circle(138).move(31, 31).fill(this.radial);

		// 绘制文本
	  this.tspans(this.draw, `${this.title}`, '#fff');


	}

}

class Circle extends CreatCircle{
	constructor(json) {
		super(json);
		// this.outTxt = 25; // 传入的参数-百分比
		this.FONT_SIZE = 50;
    this.creatCircle = this.creatCircle.bind(this);
	}
	creatCircle() {
		this.creatSvg();
		// 计算周长
	  this.PD1 = Math.PI * this.D1;
		// 绘制外圆环
		this.afterCircle = this.draw.circle(184).fill('none').stroke({ width: 16, color: this.afterColor, linecap: 'round'}).move(8, 8);
		this.outCircle = this.draw.circle(184).fill('none').stroke({ width: 16, color: this.outColor, linecap: 'round'}).move(8, 8);
		this.rangeValues = this.outTxt / 100;
		this.outCircle.attr({
			'stroke-dasharray': `0 ${this.PD1}`
		}).rotate('-90').animate().attr({
			'stroke-dasharray': `${this.PD1 * this.rangeValues} ${this.PD1 * (1 - this.rangeValues)}`
		}).rotate('-90');
		// 绘制文本
	  this.tspans(this.draw, `${this.outTxt}%`, '#fff');
	}
}

class CreatLines{
	constructor(id, moveTo){
    this.id = id;
    this.moveTo = moveTo;
    this.creatLine = this.creatLine.bind(this);
	}
	creatLine(){
    // 创建SVG
    this.draw = SVG(this.id).size('100%', '100%');
    for(let i in this.moveTo) {
      if(i === '0') continue;
      this.offsetT2 = (this.moveTo[1].top-this.moveTo[0].top) / 1.7;
      //this.path = this.draw.line(this.moveTo[0].left, this.moveTo[0].top, this.moveTo[0].left, this.offsetT2, this.moveTo[i].left, this.offsetT2, this.moveTo[i].left, this.moveTo[i].top ).stroke({ color: '#f06', width: 2, linecap: 'round' });
      this.path = this.draw.polyline(`${this.moveTo[0].left},${this.moveTo[0].top}, ${this.moveTo[0].left},${this.moveTo[0].top + this.offsetT2}, ${this.moveTo[i].left},${this.moveTo[0].top + this.offsetT2}, ${this.moveTo[i].left},${this.moveTo[i].top}`).fill('none').stroke({ color: '#43f5f1', width: 2, linecap: 'round' });
		}
	}
}

export {DoubleCircle, Circle, CreatLines}
