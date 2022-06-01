"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./prisma");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(process.env.PORT || 3333, () => {
    console.log('Servidor online!');
});
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { container, title, subject } = req.body;
    yield prisma_1.prisma.post.create({
        data: {
            container,
            title,
            createdAt: new Date(),
            subject,
        }
    });
    console.log(req.body);
    return res.send("Post enviado");
}));
app.get('/subjects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = req.query.subject;
    const response = yield prisma_1.prisma.post.findMany({
        where: {
            subject,
        }
    });
    res.send(JSON.stringify(response));
}));
app.get('/topics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = req.query.topic;
    const id = Number(topic);
    const response = yield prisma_1.prisma.post.findUnique({
        where: {
            id,
        }
    });
    res.send(JSON.stringify(response));
}));
