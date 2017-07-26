搭建过程：
	1.npm太慢，故选用阿里系tnpm进行搭建
		$ tnpm install -g create-react-app
		$ create-react-app my-demo-1
	2.考虑到demo运行速度等原因，my-demo-1暂不引入路由、UI库、redux等，如需参看其plus版本，敬请期待

思路：
	1.平衡数数量是0到多个
	2.未指定数据类型，可能包含非数字类型
	3.js浮点数运算不准确，需要转成整数进行运算。
	4.数组长度小于等于2时，不存在平衡位
	5.第一位和第length-1位不能是平衡位
